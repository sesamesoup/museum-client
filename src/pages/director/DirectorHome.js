import DirectorNavbar from "../../components/director/DirectorNavbar";
import DirectorBar from "../../components/director/DirectorBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

export default function DirectorHome() {
  const [exhibitRevenue, setExhibitRevenue] = useState([]);
  const [exhibitStats, setExhibitStats] = useState([]);
  const [collectionStats, setCollectionStats] = useState([]);
  const [collectionRev, setCollectionRev] = useState([]);
  const [donationRev, setDonationRev] = useState([]);
  const [giftRev, setGiftRev] = useState([]);
  const [ticketSum, setTicketSum] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [noManagers, setNoManagers] = useState([]);

  const { currentAuthID, currentAuthRole, logout, currentAuthDep } =
    useContext(AuthContext);

  useEffect(() => {
    fetchExhibitRev();
    fetchExhibitStats();
    fetchCollectionStats();
    fetchCollectionRevenue();
    fetchGiftRevenue();
    fetchDonationRev();
    fetchTicketSum();
    fetchBestsellers();
    fetchEmptyDepts();
  }, []);

  const fetchTicketSum = () => {
    fetch("http://localhost:3001/exhibit-ticket-sum", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTicketSum(data);
        console.log("ticket sum", data);
      });
  };

  const fetchDonationRev = () => {
    fetch("http://localhost:3001/donation-rev", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDonationRev(data);
        console.log("donation revenue", data);
      });
  };

  const fetchExhibitRev = () => {
    fetch("http://localhost:3001/exhibit-revenue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExhibitRevenue(data);
        console.log("exhibit revenue", data);
      });
  };

  const fetchExhibitStats = () => {
    fetch("http://localhost:3001/exhibit-stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExhibitStats(data);
        console.log("exhibit stats", exhibitStats);
      });
  };

  const fetchCollectionStats = () => {
    fetch("http://localhost:3001/collection-stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCollectionStats(data);
        console.log("collection stats", data);
      });
  };

  const fetchCollectionRevenue = () => {
    fetch("http://localhost:3001/collection-revenue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCollectionRev(data);
        console.log("col rev", data);
      });
  };

  const fetchGiftRevenue = () => {
    fetch("http://localhost:3001/shop-revenue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGiftRev(data);
        console.log("gift rev", data);
      });
  };

  const fetchBestsellers = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/bestsellers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBestsellers(data);
      });
  };

  const fetchEmptyDepts = () => {
    fetch("http://localhost:3001/dept-no-mgr", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNoManagers(data);
        console.log("no managers", data);
      });
  };

  //   console.log("revenue", revenue);
  //   console.log("items sold", itemsSold);
  //   console.log("soldout", soldOut);
  //   console.log("lowstock", lowStock);
  //   console.log("bestsellers", bestsellers);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <DirectorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <DirectorBar title="Dashboard" />

          {exhibitRevenue.length > 0 &&
          exhibitStats.length > 0 &&
          collectionRev.length > 0 &&
          giftRev.length > 0 &&
          donationRev.length > 0 &&
          ticketSum.length > 0 &&
          bestsellers.length > 0 && noManagers.length > 0 ? (
            <div className="flex flex-row px-14 gap-x-6 text-md">
              <div className="flex flex-col gap-y-6 w-1/2">

              {noManagers.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-4 h-fit">
                    <h1 className="font-bold text-xl text-cinnabar">
                      Urgent!
                    </h1>
                    <p>These departments currently do not have any assigned managers.</p>
                    <div className="flex flex-col gap-y-2">
                      {noManagers.map((item, id) => (
                        <div
                          key={item.department_name}
                          className="flex flex-row justify-between"
                        >
                          <p className="">- {item.department_name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {exhibitRevenue.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-4 h-fit">
                    <h1 className="font-bold text-xl">
                      Total Exhibition Revenue
                    </h1>
                    <h4 className="text-xl">
                      ${exhibitRevenue[0].Total_Revenue}
                    </h4>
                  </div>
                ) : null}

                {collectionRev.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">
                      Ticket Revenue for Permanent Collections
                    </p>

                    <div className="flex flex-col gap-y-4 text-xl">
                      ${collectionRev[0].Total_Rev}
                    </div>
                  </div>
                ) : null}

                {collectionStats.length > 0 && ticketSum.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Total Ticket Stats</p>

                    <div className="flex flex-col gap-y-2">
                      <p>
                        {collectionStats[0].Total_Sum} Permanent Collection
                        tickets sold
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <p>{ticketSum[0].Total_Sum} Exhibition tickets sold</p>
                    </div>
                  </div>
                ) : null}

                {donationRev.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Donation Revenue</p>

                    <div className="flex flex-col gap-y-4">
                      ${donationRev[0].Donation_Sum}
                    </div>
                  </div>
                ) : null}

                {giftRev.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Gift Shop Revenue</p>

                    <div className="flex flex-col gap-y-4">
                      ${giftRev[0].total_revenue}
                    </div>
                  </div>
                ) : null}

                {bestsellers.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Shop Bestsellers</p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Item</p>
                      <p className="font-bold underline"># sold</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {bestsellers.map((item, id) => (
                        <div
                          key={item.gift_index}
                          className="flex flex-row justify-between"
                        >
                          <p className="">{item.gift_name}</p>
                          <p className="">{item.gift_numSold}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-y-6 w-1/2">
                {exhibitStats.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Revenue per Exhibition</p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Exhibition</p>
                      <p className="font-bold underline">Revenue</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {exhibitStats.map((item, id) => (
                        <div
                          key={item.Exhibit_ID}
                          className="flex flex-row justify-between"
                        >
                          <p className="w-1/2">- {item.Exhibit_Name}</p>
                          <p className="">
                            $
                            {item.Total_Revenue === null
                              ? `0`
                              : item.Total_Revenue}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {exhibitStats.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">
                      Ticket Stats per Exhibition
                    </p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Exhibition</p>
                      <p className="font-bold underline"># of tickets sold</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {exhibitStats.map((item, id) => (
                        <div
                          key={item.Exhibit_ID}
                          className="flex flex-row justify-between"
                        >
                          <p className="w-1/2">- {item.Exhibit_Name}</p>
                          <p className="">{item.Tickets_Sold}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}