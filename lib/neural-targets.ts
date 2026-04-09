import { MotionValue } from 'framer-motion';

interface NeuralTarget {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  range: number;
}

const targetMap = new Map<string, NeuralTarget>();
const motionMap = new Map<string, MotionValue<number>>();
const elementMap = new Map<string, HTMLElement>();

let scheduledRafId: number | null = null;
let listenerCount = 0;

function runGlobalUpdate() {
  scheduledRafId = null;
  for (const [id, element] of elementMap.entries()) {
    updateNeuralTarget(id, element);
  }
}

function scheduleGlobalUpdate() {
  if (scheduledRafId !== null) return;
  scheduledRafId = requestAnimationFrame(runGlobalUpdate);
}

function addGlobalListeners() {
  window.addEventListener('resize', scheduleGlobalUpdate);
  window.addEventListener('scroll', scheduleGlobalUpdate, { passive: true });
}

function removeGlobalListeners() {
  window.removeEventListener('resize', scheduleGlobalUpdate);
  window.removeEventListener('scroll', scheduleGlobalUpdate);
}

export function subscribeToGlobalUpdates() {
  listenerCount++;
  if (listenerCount === 1) addGlobalListeners();
  return () => {
    listenerCount--;
    if (listenerCount === 0) {
      removeGlobalListeners();
      if (scheduledRafId !== null) {
        cancelAnimationFrame(scheduledRafId);
        scheduledRafId = null;
      }
    }
  };
}

export function registerNeuralTarget(id: string, element: HTMLElement, range = 220): MotionValue<number> {
  elementMap.set(id, element);
  updateNeuralTarget(id, element);
  const t = targetMap.get(id)!;
  t.range = range;
  if (!motionMap.has(id)) motionMap.set(id, new MotionValue(1000));
  return motionMap.get(id)!;
}

function updateNeuralTarget(id: string, element: HTMLElement) {
  if (!targetMap.has(id)) targetMap.set(id, { id, x: 0, y: 0, width: 0, height: 0, range: 220 });
  const rect = element.getBoundingClientRect();
  const t = targetMap.get(id)!;
  t.x = rect.left + rect.width / 2;
  t.y = rect.top + rect.height / 2;
  t.width = rect.width;
  t.height = rect.height;
}

export function unregisterNeuralTarget(id: string) {
  targetMap.delete(id);
  motionMap.delete(id);
  elementMap.delete(id);
}

export const neuralTargetMap = targetMap;

export function setNeuralTargetDistance(id: string, distance: number) {
  motionMap.get(id)?.set(distance);
}
