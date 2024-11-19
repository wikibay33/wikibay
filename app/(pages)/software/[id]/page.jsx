// app/(pages)/software/[id]/page.jsx

import { connectToDB } from '@/utils/database';
import Software from '@/models/software';
import SoftwareDetailsClient from './SoftwareDetailsClient';
import SoftwareDetails from './SoftwareDetails';


// Server component to fetch and render data
export default async function SoftwarePage({ params }) {
    if (!params ) {
        return <div>Error: ID not found</div>;
    }

    const { id } = await params;

    // const { id } = params;
    // await connectToDB();
    // const software = await Software.findById(id).lean();

    // if (!software) {
    //     return <div>Software not found</div>;
    // }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 mt-5">
            <SoftwareDetails id={id}/>
            {/* <SoftwareDetailsClient software={software} /> */}
        </div>
    );
}
