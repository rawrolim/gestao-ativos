import React from 'react';

export default function CardComponent(props) {
    return (
        <div className="col-12 col-md-4 col-xl-3 rounded p-2">
            <div className="border p-2 rounded bg-light text-dark">
                {props.children}
            </div>
        </div>
    )
}

