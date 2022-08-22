import { Input, Label, Text } from "@fluentui/react-components"
import { useEffect, useState } from "react"
import { ReactSearchAutocomplete } from "react-search-autocomplete"

import '../css/AdditionalInformationForm.css'

type Completion = {
    id: number
    completion: string
}

export const AdditionalInformationForm = () => {
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [trainNumber, setTrainNumber] = useState<number | null>(null);
    const [desination, setDestination] = useState<string | null>(null);
    const [start, setStart] = useState<string | null>(null);

    const [placeCompletions, setPlaceCompletions] = useState<Completion[]>([]);
    const [query, setQuery] = useState<string | null>(null);

    useEffect(() => {
        if (!query || query.length < 3) {
            return;
        }

        const fetchCompletions = async () => {
            const completions = await getCompletions(query)
            setPlaceCompletions(completions.map((x, i) => { return {id: i, completion: x} }));
        }

        fetchCompletions();
    }, [query])

    const getCompletions = async (query: string): Promise<string[]> => {
        const response = await fetch(`https://blooming-headland-63549.herokuapp.com/completions/${query}`);
        return (await response.json()).response;
    }

    return (
        <div className="container">
            <datalist id="results">
                {
                    placeCompletions.map(x => (<option value={x.completion} />))
                }
            </datalist>
            <Label size="large">Enter Additional Information:</Label>
            
            <Text size={400}>Transport:</Text>
            <div className="input-container">
                <Label>Date of departure</Label>
                <Input onChange={(e) => setDepartureDate(new Date(e.target.value))} type="datetime-local" id="date-input" />
            </div>

            <div className="input-container">
                <Label>Train number</Label>
                <Input type="number" onChange={(e) => setTrainNumber(parseInt(e.target.value))}></Input>
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