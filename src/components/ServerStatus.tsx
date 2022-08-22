import { QuestionCircle48Filled, ShareScreenStop48Filled, ThumbLike48Filled, WindowWrench48Filled } from "@fluentui/react-icons";
import { Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import '../css/ServerStatus.css';

type ServerStatusType = 'UNKNOWN' | 'STARTING' | 'STARTED' | 'DOWN';

export const ServerStatus = () => {
    const [serverStatus, setServerStatus] = useState<ServerStatusType>('UNKNOWN');

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                setServerStatus('STARTING')
                const response = await fetch('https://blooming-headland-63549.herokuapp.com/status');
                if (response.status === 200) {
                    setServerStatus('STARTED');
                }
            } catch (e: any) {
                setServerStatus('DOWN')
            }
        }

        checkServerStatus();
    }, [setServerStatus]);

    return (
        <div className="bottom-left">
            <div className="status-container">
                <Text>Server Status: </Text>
                { serverStatus === 'UNKNOWN' && 
                    <div className="icons-container">
                        <QuestionCircle48Filled className="icon" />
                        <Text>Unknown</Text>
                    </div> }

                { serverStatus === 'DOWN' &&
                    <div className="icons-container">
                        <ShareScreenStop48Filled className="icon" />
                        <Text>Down</Text>
                    </div> }
                
                {serverStatus === 'STARTING' &&
                    <div className="icons-container">
                        <WindowWrench48Filled className="icon" />
                        <Text>Starting...</Text>
                    </div> }
                
                { serverStatus === 'STARTED' &&
                    <div className="icons-container">
                    <ThumbLike48Filled className="icon" />
                    <Text>Started</Text>
                    </div> }
            </div>
        </div>
    );
}