import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Archivo } from 'next/font/google';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ConfirmationModal from './ConfirmationModal';


const archivo = Archivo({ subsets: ["latin"] });

type FieldNameSelectorProps = {
  fieldNames?: string[];
  onSubmit: (data: Record<string, string | null>) => void;
};

let groupedClientDataOptions = [
  {
    label: "Name",
    options: [
      { label: 'Full Name', value: 'full name' },
      { label: 'First Name', value: 'first name' },
      { label: 'Middle Name', value: 'middle name' },
      { label: 'Middle Initial', value: 'middle initial' },
      { label: 'Last Name', value: 'last name' },
    ],
  },
  {
    label: "Address",
    options: [
      { label: 'Full Address', value: 'full address' },
      { label: 'Street Address', value: 'street address' },
      { label: 'City', value: 'city' },
      { label: 'State', value: 'state' },
      { label: 'Zip', value: 'zip' },
      { label: 'City, State, Zip', value: 'city,state,zip' },
    ],
  },
  {
    label: "Personal Information",
    options: [
      { label: 'Full SSN', value: 'full ssn' },
      { label: 'SSN First 3 Digits', value: 'ssn first 3 digits' },
      { label: 'SSN Middle 2 Digits', value: 'ssn middle 2 digits' },
      { label: 'SSN Last 4 Digits', value: 'ssn last 4 digits' },
    ],
  },
];

groupedClientDataOptions = groupedClientDataOptions.sort((a, b) => a.label.localeCompare(b.label));

const FieldNameSelector = ({ fieldNames = [], onSubmit }: FieldNameSelectorProps) => {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [fundName, setFundName] = useState<string>("");
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const handleCheckboxChange = (fieldName: string) => {
    setCheckedState(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };
  
  const handleSelectChange = (fieldName: string, value: string) => {
    setSelectedValues(prev => ({ ...prev, [fieldName]: value }));
  };
  
  const handleFinalizeTraining = () => {
    setShowConfirmationModal(true);
  }

  const getSelectedDataDictionary = () => {
    const selectedData: Record<string, string | null> = {
      "Fund Name": fundName,
    };
    fieldNames.forEach(fieldName => {
      if (checkedState[fieldName]) {
        selectedData[fieldName] = selectedValues[fieldName] || null;
      }
    });
    return selectedData;
  };

  const selectedData = getSelectedDataDictionary();

  return (
    <div style={{ width: '100%', height: '100vh' }} className='p-4 border-2 border-yellow-500 shadow-lg rounded-lg overflow-auto'>
      <div className='flex flex-cols gap-3 mb-5'>
        <h3 className={`${archivo.className} font-extrabold text-yellow-500`}>Fund Name: </h3>
        <Input 
          type='text' 
          placeholder='Enter fund name'
          value={fundName}
          onChange={(e) => setFundName(e.target.value)}
        />
        <TooltipProvider>
          <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleFinalizeTraining}>Confirm Selections</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Please click when you've completed training</p>
          </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {fieldNames?.map((fieldName: string, index: number) => (
        <div key={index} className="mb-6">
          <div className="flex items-center mb-2">
            <Checkbox 
            id={`checkbox-${index}`} 
            checked={checkedState[fieldName] || false}
            onCheckedChange={() => handleCheckboxChange(fieldName)}
            />
            <label htmlFor={`checkbox-${index}`} className="ml-2">{fieldName}</label>
          </div>
          <Select
            value={selectedValues[fieldName] || ''}
            onValueChange={(value) => handleSelectChange(fieldName, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="--Select data--" />
            </SelectTrigger>
            <SelectContent>
              {groupedClientDataOptions.map((group, groupIdx) => (
                <SelectGroup key={groupIdx}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.options.map((option, optionIdx) => (
                    <SelectItem key={optionIdx} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      {showConfirmationModal && (
        <ConfirmationModal
          data={selectedData}
          onClose={() => setShowConfirmationModal(false)}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default FieldNameSelector;
