import React, { FC, useEffect, useState } from "react";
import { SelectableCard } from 'vtex.styleguide';

interface SelectProps {
    items: any[];
    itemComponent: any;
    multiple?: boolean;
    identifier: string;
    onSelected: (selected: any) => void;
}

const Select: FC<SelectProps> = ({ items, itemComponent, multiple = false, identifier, onSelected }) => {

    const [selected, setSelected] = useState([])

    useEffect(() => {
        if (selected.length) {
            onSelected(selected);
        }
    }, [selected])

    const handleSelected = (item) => {
        if (isSelected(item)) {
            const newSelected = selected.filter(selectedItem => selectedItem[identifier] !== item[identifier]);
            setSelected(newSelected);
        } else {
            if (multiple) {
                setSelected([...selected, item]);
            } else {
                setSelected([item]);
            }
        }
    }

    const isSelected = (item) => {
        return selected.some(selectedItem => selectedItem[identifier] === item[identifier]);
    }

    const childWithProps = (data) => {
        if (React.isValidElement(itemComponent)) {
            return React.cloneElement(itemComponent, data);
        }
        return React.createElement(itemComponent, { data });
    };

    return <div className="pa5 flex flex-wrap justify-start">
        {items.map(item => (
            <div className="mr6 mb6">
                <SelectableCard
                    hasGroupRigth
                    noPadding
                    selected={isSelected(item)}
                    onClick={() => handleSelected(item)}>
                    {childWithProps(item)}
                </SelectableCard>
            </div>
        ))}

    </div>
}

export default Select;