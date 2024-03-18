import React from "react";
import Upload from '../../components/anxiety'
import Create from '../../components/Trauma'
// import List from '../../components/'
function Index() {
    return (
        <>
            <div className="bg-gray-100 container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 pt-6 gap-8">
                {/* Remove class [ h-24 ] when adding a card block */}
                {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
                <Upload />
                {/* Remove class [ h-24 ] when adding a card block */}
                {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
                <Create />
                {/* Remove class [ h-24 ] when adding a card block */}
                {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
                {/* <List /> */}
                {/* Remove class [ h-24 ] when adding a card block */}
                {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
                {/* <div className="rounded border-gray-300  dark:border-gray-700 border-dashed border-2 h-24" /> */}
            </div>
        </>
    );
}
export default Index;