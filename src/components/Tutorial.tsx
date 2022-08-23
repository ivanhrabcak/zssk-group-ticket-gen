import { Label, Text } from "@fluentui/react-components";
import '../css/Tutorial.css';
import { ServerStatus } from "./ServerStatus";
import screenshot from '../images/screenshot1.png'

export const Tutorial = () => {
    return (
        <div>
            <Label size="large">How to use:</Label>
            <Text>
                <ol>
                    <li>Create an excel file with a header like shown here: (be careful, the header names are case-sensitive)</li>
                    <div className="centered">
                        <img src={screenshot} alt="screenshot" />
                    </div>
                    <li>Make sure you format all cells as text (not as a number or date or anything else)!!!</li>
                    <li>Save your file as xlsx.</li>
                    <li>Input some additional information (this information will be the same in every document)</li>
                    <li>Choose your excel file in the "Generate" section</li>
                    <li>Click "Generate Files"</li>
                    And you're done!
                </ol>
            </Text>

            <ServerStatus />
        </div>
    );
}