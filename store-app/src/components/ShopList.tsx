import React from 'react';
import Shop from './Shop';

interface Props {
    stores: any[]
}

const ShopList: React.FC<Props> = (props) => {
    return (
        <div>
            <ul>
                {
                    props.stores.map((store) => (
                        <Shop name={store.name}/>
                    ))
                }
            </ul>
        </div>
    );
}

export default ShopList;