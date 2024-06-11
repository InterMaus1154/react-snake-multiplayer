import {FC} from 'react';
import Page from "./Page.tsx";
import SetupModal from "../components/modals/SetupModal.tsx";


const SetupPage: FC = () => {
    return (
        <Page>
            <div className="setup-page">
                <SetupModal />
            </div>
        </Page>
    );
};

export default SetupPage;