import React from 'react';
import { AcceptHostedIFrameIntegrationProps, CompoundComponentCommonProps, CompoundComponentWithChildrenProps, IFrameIntegrationContext } from '../../types';
declare const IFrameIntegrationContext: React.Context<IFrameIntegrationContext | null>;
export declare const useIFrameIntegrationContext: () => IFrameIntegrationContext;
export declare const IFrameIntegration: ({ formToken, postUrl, onTransactionResponse, onCancel, onSuccessfulSave, onResize, children, }: AcceptHostedIFrameIntegrationProps) => JSX.Element;
export declare const IFrameIntegrationButton: ({ children, className, }: CompoundComponentWithChildrenProps) => JSX.Element;
export declare const IFrameContainer: ({ children, className, style, }: CompoundComponentWithChildrenProps) => JSX.Element;
export declare const IFrameBackdrop: ({ className, style, }: CompoundComponentCommonProps) => JSX.Element;
export declare const IFrame: ({ className, style }: CompoundComponentCommonProps) => JSX.Element;
export {};
