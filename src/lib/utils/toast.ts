import { toastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings } from '@skeletonlabs/skeleton';

export const triggerToast = (messageText: string, type: string) => {
    let t: ToastSettings = {
        message: messageText,
        background: `variant-filled-${type}`,
        classes: 'h-10'
    };
    toastStore.trigger(t);
};