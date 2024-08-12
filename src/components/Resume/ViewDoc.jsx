import React from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const ViewDoc = ({ docBlob }) => {
    if (!docBlob) {
        return <div>No document available</div>;
    }

    
    // Create a URL for the blob
    const docUrl = URL.createObjectURL(docBlob);

    // Prepare the documents array
    const docs = [
        {
            uri: docUrl,
            fileType: 'docx', // Explicitly set the file type if necessary
        },
    ];

    return (
        <div style={{ height: '100vh' }}>
            <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default ViewDoc;
