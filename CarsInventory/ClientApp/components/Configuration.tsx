// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

var Config = require('config');

export interface IMyConfiguration {
    serverBaseUrl:string;
}

 export class MyConfiguration implements IMyConfiguration{
    serverBaseUrl: string;

    constructor(public webApiBaseUrl: string, public signalrBaseUrl: string) {
    
    }

}


export * from "./Configuration";