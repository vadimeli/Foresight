import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './select.css';


export const Select = ({ placeholder, isMultiple, startOptions, alertSelectedItems }) => {
    console.log(startOptions);
    const [allSelected, setAllSelected] = useState(false);

    const [options, setOptions] = useState(startOptions);

    const handleCheckbox = (id) => {
        let tempOptions = [...options];
        let index = tempOptions.findIndex(obj => obj.id === id);

        if(isMultiple === false) {
            for(let i = 0; i < tempOptions.length; i++) {
                tempOptions[i].checked = false;
            }
        }

        tempOptions[index].checked = typeof tempOptions[index].checked === 'undefined' ? true : !tempOptions[index].checked;
        setOptions(tempOptions);
    };


    const toggleAllSelection = (boolean) => {
        let tempOptions = [...options];
        for(let i = 0; i < tempOptions.length; i++) {
            tempOptions[i].checked = boolean;
        }

        setOptions(tempOptions);
        setAllSelected(boolean);
    };

    const showSelectedCategories = () => {
        let itemsToDisplay = "";
        let tempOptions = [...options];
        for(let i = 0; i < tempOptions.length; i++) {
             if(tempOptions[i].checked === true)
                 itemsToDisplay += tempOptions[i].label + " ";
        }

        itemsToDisplay.length === 0 ? alertSelectedItems(placeholder) : alertSelectedItems(itemsToDisplay);
    };

    const filterOptions = (e) => {
        let value = e.target.value.toLowerCase();
        if(value.length === 0){
            setOptions(startOptions);
        }
        else {
            let tempOptions = [...options];
            let newOptions = tempOptions.filter(item => item.label.toLowerCase().includes(value));
            setOptions(newOptions);
        }
    };

    return (
        <div className="select">
            <input className="search" type="text" placeholder="Search by Category" onChange={(e) => {filterOptions(e)}}/>

            <ul>
            {options.map((item) =>
                    <li key={item.id}>
                        <input type="checkbox"
                             value={item.value}
                             checked={typeof item.checked !== 'undefined' ? item.checked : ""}
                             onChange={()=>{handleCheckbox(item.id)}}
                        />
                        {item.label}
                    </li>
            )}
            </ul>

            {isMultiple ?
                <div className="all-selection">
                    {allSelected
                        ? <span onClick={() => toggleAllSelection(false)}>Deselect All</span>
                        : <span onClick={() => toggleAllSelection(true)}>Select All</span>
                    }
                </div>
                : ""
            }

            <button onClick={showSelectedCategories}>Show Selected Categories</button>
        </div>
    );
};

Select.propTypes = {
    isMultiple: PropTypes.bool,
    startOptions: PropTypes.array,
    placeholder: PropTypes.string,
    alertSelectedItems: PropTypes.func
};

