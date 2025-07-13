import { serve } from 'inngest/next';

import { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion } from '../../../config/inngest';


export const { GET, POST, PUT} = serve({
    client: Inngest,
    functions: [
        syncUserCreation,
        syncUserUpdation,
        syncUserDeletion

    ],
});