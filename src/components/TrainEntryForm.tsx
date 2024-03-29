import { Input, Label } from "@fluentui/react-components"
import { useEffect, useState } from "react"

import '../css/TrainEntryForm.css';
import { Train } from "./AdditionalInformationForm";

export const TrainEntryForm = ({setTrain, train}: {setTrain: (train: Train) => void, train: Train}) => {
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [trainNumber, setTrainNumber] = useState<string | null>(null);
    const [desination, setDestination] = useState<string | null>(null);
    const [start, setStart] = useState<string | null>(null);

    const [placeCompletions, setPlaceCompletions] = useState<string[]>([]);
    const [query, setQuery] = useState<string | null>(null);

    useEffect(() => {
        if (!departureDate || !trainNumber || !desination || !start) {
            return;
        }

        if (train !== undefined) {
            if (train.dateOfDeparture == departureDate.toLocaleDateString('sk-SK')
                && train.from == start
                && train.to == desination
                && train.trainNumber == trainNumber) {
                    return
                }
        }

        setTrain({
            dateOfDeparture: departureDate.toLocaleDateString('sk-SK'),
            from: start,
            to: desination,
            trainNumber: trainNumber
        })
    }, [departureDate, trainNumber, desination, start, setTrain])

    useEffect(() => {
        if (!query || query.length < 3) {
            return;
        }

        const fetchCompletions = async () => {
            const completions = await getCompletions(query)
            setPlaceCompletions(completions);
        }

        fetchCompletions();
    }, [query])

    const getCompletions = async (query: string): Promise<string[]> => {
        const response = await fetch(`https://blooming-headland-63549.herokuapp.com/completions/${query}`);
        return (await response.json()).response;
    }

    return (
        <div className="train-entry-form-container">
            <datalist id="results">
                {
                    placeCompletions.map((x, i) => (<option key={i} value={x} />))
                }
            </datalist>

            <div className="input-container">
                <Label>Train number</Label>
                <Input type="text" onChange={(e) => setTrainNumber(e.target.value)}></Input>
            </div>

            <div className="input-container">
                <Label>Date of departure</Label>
                <Input onChange={(e) => setDepartureDate(new Date(e.target.value))} type="datetime-local" id="date-input" />
            </div>


            <div className="input-container wide">
                <Label>From</Label>
                <Input list="results" onChange={e => { setQuery(e.target.value); setStart(e.target.value) }} type="search"></Input>
            </div>

            <div className="input-container wide">
                <Label>To</Label>
                <Input list="results" onChange={e => { setQuery(e.target.value); setDestination(e.target.value) }} type="search"></Input>
            </div>
        </div>
    )
}