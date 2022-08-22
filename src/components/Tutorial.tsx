export const Tutorial = () => {
    return (
        <div>
            <h1>How to use:</h1>
            <div>
                <ol>
                    <li>Create an excel file with all names like shown here: (be careful, the header names are case-sensitive)</li>
                    <img src="/screenshot1.png" alt="screenshot" />
                    <li>Make sure you format all cells as text (not as a number or date or anything else)!!!</li>
                    <li>Save your file as xlsx.</li>
                    <li>Input some additional information below (the same information will be in every document)</li>
                    <li>Choose your excel file in the "Generate" section</li>
                    <li>Click "Generate files"</li>
                    And you're done!
                </ol>
            </div>
        </div>
    );
}