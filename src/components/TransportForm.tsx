import { Button, Input, Label, Text } from "@fluentui/react-components"
import { Delete48Filled, DismissCircle48Filled } from "@fluentui/react-icons";
import { Fragment, useEffect, useState } from "react"

import '../css/TransportForm.css'
import { defaultTrain, Train } from "./AdditionalInformationForm";
import { TrainEntryForm } from "./TrainEntryForm";

export const TransportForm = ({trains, setTrains}: {trains: Train[], setTrains: React.Dispatch<React.SetStateAction<Train[]>>}) => {
    // const [internalTrains, setInternalTrains] = useState<Train[]>(trains);

    return (
        <div className="train-form-outer">
            <Text size={400}>Trains:</Text>
            <div>
                {
                    trains.map((x, i) => {
                        return (
                            <div key={i} className={`trainentryform ${i === 0 ? 'left' : ''}`}>
                                <Text className="center-of-form" size={400} weight="semibold">{i + 1}.</Text>
                                <TrainEntryForm setTrain={(newTrain) => {
                                    setTrains(trains.map((t, j) => i === j ? newTrain : t))
                                }} />
                                { i !== 0 && 
                                    <div className="vertically-center">
                                        <Button 
                                            onClick={() => setTrains(trains.filter((x, j) => i !== j))} 
                                            icon={<Delete48Filled className="red" />}
                                            className="front center-of-form" />
                                    </div>
                                }
                                
                            </div>
                        );
                    })
                }
            </div>
            { trains.length < 8 && <Button className="small-button" onClick={() => setTrains([...trains, defaultTrain()])}>Add a train</Button> }
        </div>
    )
}