import React from 'react';

interface Props {
    name: string
}

const Shop: React.FC<Props> = (props) => {
    return (
        <li>
            {
                props.name
            }
        </li>
    );
};

export default Shop;


