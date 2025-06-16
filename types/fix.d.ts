// types/fix.d.ts

declare global {
  // Override any broken global type trying to mess with route params
export interface PageProps {
    params: { id: string };
  }
}

export {};
