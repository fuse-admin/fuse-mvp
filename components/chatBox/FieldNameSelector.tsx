import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FieldNameSelectorProps = {
  fieldNames?: string[];
};

const FieldNameSelector = ({ fieldNames }: FieldNameSelectorProps) => {
  const clientDataOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Address', value: 'address' },
    { label: 'City, State, Zip', value: 'city,state,zip' },
    { label: 'Social Security Number', value: 'social security number' },
    { label: 'Email', value: 'email' },
    { label: 'Telephone', value: 'telephone' },
  ];

  return (
    <div 
    style={{width: '100%', height: '100vh'}}
    className='p-4 border-2 border-yellow-500 shadow-lg rounded-lg overflow-auto'>
      {fieldNames?.map((fieldName: string, index: number) => (
        <div key={index} className="mb-6 font-bold">
          <div className="flex items-center mb-2">
            <Checkbox id={`checkbox-${index}`} />
            <label htmlFor={`checkbox-${index}`} className="ml-2">{fieldName}</label>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="--Select---" />
            </SelectTrigger>
            <SelectContent>
              {clientDataOptions.map((option, idx) => (
                <SelectItem key={idx} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
};

export default FieldNameSelector;
