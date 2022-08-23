import { Input, Label, Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Organization } from "./AdditionalInformationForm";

export const SchoolForm = ({setOrganization}: {setOrganization: (organization: Organization) => void}) => {
    const [schoolName, setSchoolName] = useState<string>('');
    const [headquarters, setHeadquarters] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [emailAddress, setEmailAddress] = useState<string>('');

    useEffect(() => {
        setOrganization({ 
            organizationName: schoolName,
            organizationHeadquarters: headquarters,
            organizationPhoneN: phoneNumber,
            organizationEmailAddress: emailAddress
         })
    }, [schoolName, headquarters, phoneNumber, emailAddress, setOrganization])

    return (
        <div className="spaced">
            <Text size={400}>Organisation Information:</Text>
            <div className="side-by-side">
                <div className="input-container">
                    <Label>Organisation name</Label>
                    <Input type="text" onChange={(e) => setSchoolName(e.target.value)}></Input>
                </div>
            

                <div className="input-container">
                    <Label>Headquarters address</Label>
                    <Input type="text" onChange={(e) => setHeadquarters(e.target.value)}></Input>
                </div>
            </div>

            <div className="side-by-side">
                <div className="input-container">
                    <Label>Organisation email address</Label>
                    <Input type="email" onChange={(e) => setEmailAddress(e.target.value)}></Input>
                </div>

                <div className="input-container">
                    <Label>Organisation phone number</Label>
                    <Input type="text" onChange={(e) => setPhoneNumber(e.target.value)}></Input>
                </div>
            </div>
        </div>
    )
}