/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// TODO: Fix type safety
'use client'

import { useBarcode } from 'next-barcode';

function Barcode(props: { value: string }) {
    const { inputRef } = useBarcode({ value: props.value });

    return <svg ref={inputRef} className=' w-full' />;
};

export default Barcode;