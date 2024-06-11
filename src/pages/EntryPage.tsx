import {FC, useState} from 'react';
import EntryModal from "../components/modals/EntryModal.tsx";
import Page from "./Page.tsx";

interface IEntryPage {

}

const EntryPage: FC<IEntryPage> = ({}: IEntryPage) => {

    return (
        <Page>
            <div className="entry-page">
                <EntryModal/>
            </div>
        </Page>
    );
};

export default EntryPage;