import {FC,ReactNode} from 'react';
import "../style/component_style/Page.css";
interface Page {
    children: ReactNode;
}

const Page: FC<Page> = ({children}: Page) => {
    return(
        <div className="page-component">
            {children}
        </div>
    );
};

export default Page;