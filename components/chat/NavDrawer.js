import Image from "next/image";
import useAuth from "../../hooks/useAuth";
import { Fragment } from "react";
// import CloseIcon from '@mui/icons-material/Close';

const NavDrawer = ({ conversationsData, setSelected, toggleChatList}) => {
  const { user } = useAuth();

  function reduceWalletAddress(address,charLength) {
    const firstChars = address.slice(0, charLength);
    const lastChars = address.slice(-8);
    return `${firstChars}...${lastChars}`;
  }
  
  return (
    <>
    
    {!conversationsData?.length > 0 ? (
       <div className="min-h-[calc(70vh)] absoluteCenter flex items-center justify-center flex-col">
          <img
             src={"/empty.png"}
             alt=""
             className="w-1/4 h-1/4"
             style={{
                filter: "grayscale(1)",
             }}
          />
          <p className="text-center text-gray-800 font-bold">
             Please refresh if you don't see your conversations
          </p>
       </div>
    ) :<></>}
    {conversationsData?.length>0?
       <aside id="chatLists"
       className="sidebar fixed mt-2 w-80 sm:left-0 left-[-350px] duration-1000
       w-[300px] overflow-y-auto text-center bg-white shadow h-screen" aria-label="Sidebar" style={{"top":"4.5rem", "height":"84vh"}}>
       
           
          <div className="flex justify-between text-white-200 shadow-inner  p-3 bg-blue-600">
            <p className="self-center ml-20"><strong>Your Chats</strong></p>
            <strong className="text-xxl sm:hidden align-center cursor-pointer" onClick={()=>toggleChatList()}>&times;</strong>
          </div>
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800" style={{"height":"78vh"}}>
             <ul className="font-medium">
             {conversationsData.map((data, id) => {
                return (
                  <Fragment key={id}>
                {data.freelancer[0] ? 
                   <li  className="flex flex-row mb-5 mt-5 cursor-pointer" onClick={() => setSelected(data._id)}>
                      <Image 
                         src={"https://ipfs.io/ipfs/" + data.freelancer?.[0]?.ipfsImageHash}
                         alt="product image"
                         width={50}
                         height={50}
                         className="w-10 sm:w-12 h-10 sm:h-12 rounded-full"
                      />
                     <div className="flex flex-col ml-5 text-left">
                         <p className="font-bold text-md hover:underline cursor-pointer">
                            {data.freelancer?.[0]?.name}
                         </p>
                         <h5 className="mb-2 text-xs font-bold tracking-tight text-gray-900">
                            {data.freelancer?.[0].wallet_address ? reduceWalletAddress(data.freelancer?.[0].wallet_address,20):""}
                         </h5>
                            {data.freelancer?.[0].isTopRated && (
                              <p className="text-blue-800 text-xs">Top Rated Seller</p>
                              )}
                      </div>
                      
                   </li>
                :
                <li className="flex flex-row mb-5 mt-5 cursor-pointer" onClick={() => setSelected(data._id)}>
                      <Image 
                         src={"https://cryptologos.cc/logos/polygon-matic-logo.png"}
                         alt="product image"
                         width={50}
                         height={50}
                         className="w-10 sm:w-12 h-10 sm:h-12 rounded-full"
                      />
                     <div className="flex flex-col ml-5 text-left">
                         <p className="font-bold text-md hover:underline cursor-pointer">
                            {data.participants[0] != user?.wallet_address
                               ? reduceWalletAddress(data.participants[0],14)
                               : reduceWalletAddress(data.participants[1],14)}
                            
                         </p>
                         {data.freelancer?.[0]?.isTopRated && (
                           <p className="text-blue-800 text-xs">Top Rated Seller</p>
                           )}
                      </div>
                   </li>
             }
                <hr/>
                </Fragment>
                )})}
             </ul>
          </div>
       </aside>
    :<></>}
  </>
  );
};

export default NavDrawer;
