import { inject } from "mobx-react";
import { Component } from "react";
import RootStore from "../stores/RootStore"; // App's root store as a singleton

export class ConnectedComponent<T, S, X = {}> extends Component<T, X> {
  public get stores() {
    return (this.props as any) as S;
  }
}

export const connect = (...args: Array<keyof RootStore>) => inject(...args);

// https://github.com/mobxjs/mobx-react/issues/256
