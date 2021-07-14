import { identity, flow } from 'fp-ts/function';

// TODO: improve types
/* eslint-disable @typescript-eslint/no-explicit-any */

type Fun = (data?: unknown) => any;

// promise-like interface handling success an failure result of execution
type Fork = (reject: Fun, resolve: Fun) => any;

// Task interface
type Task = {
  fork: Fork; // success/failure resolution
  map: (fun: Fun) => Task; // maps Fun to Task (resolve combined with fun)
  chain: (taskable: (data?: unknown) => Task) => Task; // chains Task with another Task and flattens Task(Task) => Task
};

type TaskMonad = ((f: Fork) => Task) & { of: (data: unknown) => Task };

export const task: TaskMonad = fork => ({
  fork,
  map(f) {
    return task((rej, res) => this.fork(rej, flow(f, res)));
  },
  chain(t) {
    return task((rej, res) => this.fork(rej, x => t(x).fork(rej, res)));
  },
});

task.of = (data: unknown) => task((rej, res) => res(data)); // lift any data into a Task

// iterate task list, return first successfully resolved result
export const firstResolved = (tasks: Task[], i = 0) =>
  tasks[i].fork(() => firstResolved(tasks, i + 1), identity);

// if/else implemented with task
export const either = (predicate: (data: unknown) => boolean) => data =>
  task((rej, res) => (predicate(data) ? res(data) : rej(data)));
