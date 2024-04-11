'use client'

import { useBarcode } from 'next-barcode';

function Barcode(props: { value: string }) {
    const { inputRef } = useBarcode({
        value: props.value,
        options: {
        }
    });

    return <svg ref={inputRef} className=' w-full' />;
};

export default Barcode;