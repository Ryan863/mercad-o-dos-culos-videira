"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { LENSES, PRODUCTS, type LensId } from "./data";

export type CartItem = { productId: string; colorIndex: number };

type CartState = { items: CartItem[]; lenses: LensId[] };

const STORAGE_KEY = "mdo-videira-sacola-v1";
const EMPTY: CartState = { items: [], lenses: [] };

let state: CartState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function sanitize(raw: unknown): CartState {
  if (!raw || typeof raw !== "object") return EMPTY;
  const data = raw as Partial<CartState>;
  const items = Array.isArray(data.items)
    ? data.items.filter((item): item is CartItem => {
        if (!item || typeof item.productId !== "string") return false;
        const product = PRODUCTS.find((p) => p.id === item.productId);
        return (
          !!product &&
          Number.isInteger(item.colorIndex) &&
          item.colorIndex >= 0 &&
          item.colorIndex < product.colors.length
        );
      })
    : [];
  const lensIds = LENSES.map((l) => l.id);
  const lenses = Array.isArray(data.lenses)
    ? data.lenses.filter((id): id is LensId => lensIds.includes(id as LensId))
    : [];
  return { items, lenses };
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) state = sanitize(JSON.parse(raw));
  } catch {
    state = EMPTY;
  }
}

function commit(next: CartState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* armazenamento indisponível: segue apenas em memória */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    try {
      state = event.newValue ? sanitize(JSON.parse(event.newValue)) : EMPTY;
    } catch {
      state = EMPTY;
    }
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => state;
const getServerSnapshot = () => EMPTY;

type CartContextValue = {
  items: CartItem[];
  lenses: LensId[];
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  has: (productId: string, colorIndex: number) => boolean;
  add: (productId: string, colorIndex: number) => void;
  remove: (productId: string, colorIndex: number) => void;
  toggleLens: (id: LensId) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const has = useCallback(
    (productId: string, colorIndex: number) =>
      snapshot.items.some((i) => i.productId === productId && i.colorIndex === colorIndex),
    [snapshot.items],
  );

  const add = useCallback((productId: string, colorIndex: number) => {
    if (state.items.some((i) => i.productId === productId && i.colorIndex === colorIndex)) {
      return;
    }
    commit({ ...state, items: [...state.items, { productId, colorIndex }] });
  }, []);

  const remove = useCallback((productId: string, colorIndex: number) => {
    commit({
      ...state,
      items: state.items.filter(
        (i) => !(i.productId === productId && i.colorIndex === colorIndex),
      ),
    });
  }, []);

  const toggleLens = useCallback((id: LensId) => {
    const lenses = state.lenses.includes(id)
      ? state.lenses.filter((l) => l !== id)
      : [...state.lenses, id];
    commit({ ...state, lenses });
  }, []);

  const clear = useCallback(() => commit(EMPTY), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items: snapshot.items,
      lenses: snapshot.lenses,
      count: snapshot.items.length,
      isOpen,
      openCart,
      closeCart,
      has,
      add,
      remove,
      toggleLens,
      clear,
    }),
    [snapshot, isOpen, openCart, closeCart, has, add, remove, toggleLens, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>.");
  return ctx;
}
