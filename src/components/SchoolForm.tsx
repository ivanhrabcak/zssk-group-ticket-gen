import { Input, Label, Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Organization } from "./AdditionalInformationForm";

export const SchoolForm = ({setOrganization, organization}: {setOrganization: (organization: Organization) => void, organization: Organization | null}) => {
    const [schoolName, setSchoolName] = useState<string>('');
    const [headquarters, setHeadquarters] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [emailAddress, setEmailAddress] = useState<string>('');

    useEffect(() => {
        if (organization != null) {
            if (organization.organizationEmailAddress == emailAddress
                && organization.organizationHeadquarters == headquarters
                && organization.organizationName == schoolName
                && organization.organizationPhoneN == phoneNumber) {
                    return 
                }
        }
        setOrganization({ 
            organizationName: schoolName,
            organizationHeadquarters: headquarters,
            organizationPhoneN: phoneNumber,
            organizationEmailAddress: emailAddress
         })
    }, [schoolName, headquarters, phoneNumber, emailAddress, setOrganization])

    return (
        <div className="spaced">
            <Text size={400}>Organization Information:</Text>
            <div className="side-by-side">
                <div className="input-container">
                    <Label>Organization name</Label>
                    <Input type="text" onChange={(e) => setSchoolName(e.target.value)}></Input>
                </div>
            

                <div className="input-container">
                    <Label>Headquarters address</Label>
                    <Input type="text" onChange={(e) => setHeadquarters(e.target.value)}></Input>
                </div>
            </div>

            <div className="side-by-side">
                <div className="input-container">
                    <Label>Organization email address</Label>
                    <Input type="email" onChange={(e) => setEmailAddress(e.target.value)}></Input>
                </div>

                <div className="input-container">
                    <Label>Organization phone number</Label>
                    <Input type="text" onChange={(e) => setPhoneNumber(e.target.value)}></Input>
                </div>
            </div>
        </div>
    )
}