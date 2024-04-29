"use client"

import { ModalProvider } from "../_hooks/use-modal"
import SearchGear from './search_gear';

export default function SearchGearParent() {
    return <ModalProvider>
        <SearchGear />
    </ModalProvider>
}