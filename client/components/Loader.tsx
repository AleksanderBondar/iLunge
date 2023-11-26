import { Html } from '@react-three/drei';
import { LucideLoader2 } from 'lucide-react';
import React from 'react';

export const Loader = () => {
    return (
        <Html center>
            <div className="flex gap-2">
                <LucideLoader2 className="animate-spin" /> Loading...
            </div>
        </Html>
    );
};
