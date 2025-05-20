'use client'
import {useState, useEffect} from 'react';
import {getUserData} from '@/components/custom/firebase-utils';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '@/components/custom/firebase-auth';

export default function Library() {
    const [headings, setHeadings] = useState<string[]>([]);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // @ts-ignore
                    const data = await getUserData(user.email.toString());
                    // @ts-ignore
                    const headings = data.map((doc: any) => doc.id); // Document IDs as headings
                    setHeadings(headings);
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <title> PB - Archive </title>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden sm:mx-auto sm:max-w-lg w-full">
                <div className="bg-blue-500 text-white py-4 px-6">
                    <h1 className="text-xl font-semibold">Problem Archive</h1>
                    <p className="text-sm">( only for logged in users )</p>
                </div>
                <div className="p-6">
                    {headings.length > 0 ? (
                        <table className="table-auto w-full">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left text-gray-700">Heading</th>
                            </tr>
                            </thead>
                            <tbody>
                            {headings.map((heading, index) => {
                                const problemId = heading.split('-')[1]; // Extract the ID part
                                console.log("problemId", problemId);
                                // console.log(problemId);


                                let url = "Default";

                                if(problemId){
                                    const arr = problemId.split('&');
                                    const ctype = arr[0].split("=")[1];
                                    const cid = arr[1].split("=")[1];
                                    const ctask = arr[2].split("=")[1];
                                    url = ctype+cid+ctask;
                                    console.log("url", url);
                                }

                                // const [ctype, cid, ctask] = problemId.split('&');
                                // const arr = problemId.split('&');
                                // const url = ctype+cid+ctask;
                                const link = problemId ? `/problems/${url}?${problemId.slice(1)}` : '/board';
                                // console.log("arr", arr);
                                // console.log("url", url);


                                
                                return (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2">
                                            {/* <a href={link} className="text-blue-500 hover:underline"> */}
                                            <a href={link} className="text-blue-500 hover:underline">
                                                {url}
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center text-gray-500">
                            No documents found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}