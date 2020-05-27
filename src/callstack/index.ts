// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { CommandToolbarButton } from '@jupyterlab/apputils';

import { CommandRegistry } from '@lumino/commands';

import { Panel } from '@lumino/widgets';

import { CallstackBody } from './body';

import { CallstackHeader } from './header';

import { CallstackModel } from './model';

/**
 * A Panel to show a callstack.
 */
export class Callstack extends Panel {
  /**
   * Instantiate a new Callstack Panel.
   *
   * @param options The instantiation options for a Callstack Panel.
   */
  constructor(options: Callstack.IOptions) {
    super();
    const { commands, model } = options;

    const header = new CallstackHeader();
    const body = new CallstackBody(model);

    header.toolbar.addItem(
      'continue',
      new CommandToolbarButton({
        commands: commands.registry,
        id: commands.continue
      })
    );

    header.toolbar.addItem(
      'terminate',
      new CommandToolbarButton({
        commands: commands.registry,
        id: commands.terminate
      })
    );

    header.toolbar.addItem(
      'step-over',
      new CommandToolbarButton({
        commands: commands.registry,
        id: commands.next
      })
    );

    header.toolbar.addItem(
      'step-in',
      new CommandToolbarButton({
        commands: commands.registry,
        id: commands.stepIn
      })
    );

    header.toolbar.addItem(
      'step-out',
      new CommandToolbarButton({
        commands: commands.registry,
        id: commands.stepOut
      })
    );

    this.addWidget(header);
    this.addWidget(body);

    this.addClass('jp-DebuggerCallstack');
  }
}

/**
 * A namespace for Callstack `statics`.
 */
export namespace Callstack {
  /**
   * The toolbar commands and registry for the callstack.
   */
  export interface ICommands {
    /**
     * The command registry.
     */
    registry: CommandRegistry;

    /**
     * The continue command ID.
     */
    continue: string;

    /**
     * The terminate command ID.
     */
    terminate: string;

    /**
     * The next / stepOver command ID.
     */
    next: string;

    /**
     * The stepIn command ID.
     */
    stepIn: string;

    /**
     * The stepOut command ID.
     */
    stepOut: string;
  }

  /**
   * Instantiation options for `Callstack`.
   */
  export interface IOptions extends Panel.IOptions {
    /**
     * The toolbar commands interface for the callstack.
     */
    commands: ICommands;

    /**
     * The model for the callstack.
     */
    model: CallstackModel;
  }
}
