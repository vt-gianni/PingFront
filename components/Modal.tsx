import { MotiView } from 'moti'
import React from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function Modal({ children, visible, onClose }: { children: React.ReactNode, visible: boolean, onClose?: () => void }) {
    const tailwind = useTailwind();
    if (!visible) return null;
    return (
        <MotiView
            style={tailwind('absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex justify-center items-center')}
            from={{ scale: 0 }}
            animate={{ scale: 1 }}
        >
            <TouchableOpacity
                style={tailwind('w-full h-full items-center justify-center')}
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableWithoutFeedback>
                    {children}
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </MotiView>
    )
}
