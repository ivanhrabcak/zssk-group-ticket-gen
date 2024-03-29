import { Input, Text, Label, Radio, RadioGroup } from "@fluentui/react-components";
import { useEffect, useState } from "react";

import '../css/GroupLeaderForm.css';
import { GroupLeader } from "./AdditionalInformationForm";

export const GroupLeaderForm = ({setLeader, leader}: {setLeader: (leader: GroupLeader) => void, leader: GroupLeader | null}) => {
    const [groupLeaderName, setGroupLeaderName] = useState<string>('');
    const [groupLeaderPhoneNumber, setGroupLeaderPhoneNumber] = useState<string>('');
    const [groupLeaderIdCardNumber, setGroupLeaderIdCardNumber] = useState<string>('');
    const [groupLeaderCathegory, setGroupLeaderCathegory] = useState<string>('');
    const [groupLeaderCardNumber, setGroupLeaderCardNumber] = useState<string>('');

    useEffect(() => {
        if (leader != null) {
            if (leader.groupLeaderIdCardN == groupLeaderIdCardNumber 
                && leader.groupLeaderCat == groupLeaderCathegory 
                && leader.groupLeaderCard == groupLeaderCardNumber 
                && leader.groupLeaderPhoneN == groupLeaderPhoneNumber
                && leader.groupLeaderName == groupLeaderName) {
                return
            }
        }
        setLeader({
            groupLeaderName,
            groupLeaderPhoneN: groupLeaderPhoneNumber,
            groupLeaderCard: groupLeaderCardNumber,
            groupLeaderCat: groupLeaderCathegory,
            groupLeaderIdCardN: groupLeaderIdCardNumber
        });
    }, [groupLeaderName, groupLeaderPhoneNumber, groupLeaderIdCardNumber, 
        groupLeaderCathegory, groupLeaderCardNumber, setLeader])

    return (
        <div className="spaced">
            <Text size={400}>Group Leader Information:</Text>
            <div className="side-by-side">
                <div className="input-container">
                    <Label>Group leader name</Label>
                    <Input onChange={(e) => setGroupLeaderName(e.target.value)}></Input>
                </div>

                <div className="input-container">
                    <Label>Group leader phone number</Label>
                    <Input type="tel" onChange={(e) => setGroupLeaderPhoneNumber(e.target.value)}></Input>
                </div>
            </div>

            <div className="side-by-side">
                <div className="input-container">
                    <Label>Group leader train card number</Label>
                    <Input type="text" onChange={(e) => setGroupLeaderCardNumber(e.target.value)}></Input>
                </div>

                <div className="input-container">
                    <Label>Group leader ID card/passport number</Label>
                    <Input type="text" onChange={(e) => setGroupLeaderIdCardNumber(e.target.value)}></Input>
                </div>
            </div>

            <div className="side-by-side">
                <div className="input-container">
                    <Label>Group leader category:</Label>
                    <RadioGroup onChange={(_, v) => setGroupLeaderCathegory(v.value)}>
                        {
                            ['A', 'B', 'C', 'D'].map((x, i) => <Radio key={i} label={x} value={x} />)
                        }
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
}