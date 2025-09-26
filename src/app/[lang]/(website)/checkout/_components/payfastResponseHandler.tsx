import { useEffect, useRef } from "react";

interface PayfastResponseHandlerProps {
    htmlResponse: string;

}

const PayfastResponseHandler: React.FC<PayfastResponseHandlerProps> = ({ htmlResponse }) => {
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        const iframeDoc = iframeRef.current?.contentWindow?.document;

        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(htmlResponse);
            iframeDoc.close();
        }

    }, [htmlResponse]);

    return (
        <iframe
            ref={iframeRef}
            style={{ width: "100%", height: "400px", border: "none" }}
            title="Payment Processing"
            sandbox="allow-scripts allow-forms allow-same-origin"
            allow="payment"
            srcDoc={htmlResponse}
        />
    );
};

export default PayfastResponseHandler;
