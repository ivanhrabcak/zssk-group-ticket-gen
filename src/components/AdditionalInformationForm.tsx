import { Divider, Label } from "@fluentui/react-components"
import { TemplateData } from "easy-template-x";
import { useState } from "react"

import '../css/AdditionalInformationForm.css'

import { GroupLeaderForm } from "./GroupLeaderForm";
import { SchoolForm } from "./SchoolForm";
import { TransportForm } from "./TransportForm";

export type Train = {
    dateOfDeparture: string
    from: string
    to: string
    trainNumber: string
} & TemplateData

export type GroupLeader = {
    groupLeaderName: string
    groupLeaderPhoneN: string
    groupLeaderIdCardN: string
    groupLeaderCat: string
    groupLeaderCard: string
} & TemplateData

export type Organization = {
    organizationName: string
    organizationHeadquarters: string
    organizationPhoneN: string
    organizationEmailAddress: string
} & TemplateData

export type AdditionalInformation = {
    trains: Train[]
    leader: GroupLeader
    organization: Organization
} & TemplateData

export const defaultTrain = (): Train => { return { dateOfDeparture: '', from: '', to: '', trainNumber: '' } }

export const AdditionalInformationForm = ({setAdditionalInformation}: {setAdditionalInformation: (information: AdditionalInformation) => void}) => {
    const [trains, setTrains] = useState<Train[]>([defaultTrain()]);
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [leader, setLeader] = useState<GroupLeader | null>(null);


    return (
        <div className="additional-info-container">
            <Label className="left-side" size="large">Enter Additional Information:</Label>
            <TransportForm trains={trains} setTrains={(x) => {
                setTrains(x);
                if (organization != null && leader != null)
                    setAdditionalInformation({ trains, organization, leader })
            }} />
            <Divider className="padded small" />
            <GroupLeaderForm setLeader={(x) => {
                setLeader(x);
                if (organization != null && leader != null)
                    setAdditionalInformation({ trains, organization, leader })
            }} />
            <Divider className="padded small" />
            <SchoolForm setOrganization={(x) => {
                setOrganization(x);
                if (organization != null && leader != null)
                    setAdditionalInformation({ trains, organization, leader })
            }} />
        </div>
    )
}

// {#members}{entryn}