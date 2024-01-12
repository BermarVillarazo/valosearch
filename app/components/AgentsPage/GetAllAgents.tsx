"use client";

import { AgentProps } from "@/lib/AgentProps";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const ReusableTypewriter = dynamic(() => import("../../utils/ReusableTypewriter"), {
    ssr: false,
});

export default function GetAllAgents() {
    const [agents, setAgents] = useState<AgentProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedAgent, setSelectedAgent] = useState<AgentProps[] | null>(null);
    const [showAgentAbilities, setShowAgentAbilities] = useState<boolean>(false);

    // GET ALL AGENTS FROM THE API
    async function fetchAgents() {
        const res = await axios.get("https://valorant-api.com/v1/agents");
        const data = res.data.data;
        setAgents(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchAgents();
    }, []);

    // THIS FUNCTION IS TO DISPLAY THE AGENT'S IMAGE
    async function handleChooseAgent(uuid: string) {
        setShowAgentAbilities(false);
        const chosenAgent = agents.filter((agent) => agent.uuid === uuid);
        setSelectedAgent(chosenAgent);
    }

    // THIS FUNCTION IS TO DISPLAY THE AGENT'S ABILITY
    function handleShowAgentAbilities() {
        setShowAgentAbilities(!showAgentAbilities);
    }

    return (
        <div className="flex flex-col justify-between items-center gap-2 h-screen pt-2">
            {/* DISPLAY THE AGENT'S ABLITY */}
            <div className="w-full">
                {selectedAgent?.map(({ uuid, displayName, abilities }) => (
                    <div key={uuid} className="flex flex-col gap-3">
                        <p className="text-6xl text-center font-extrabold">
                            <ReusableTypewriter text={displayName ?? ""} loop={1} speed={90} />
                        </p>

                        {/* DISPLAY THE ABILITIES OF THE AGENT */}
                        <div className="flex flex-col justify-center items-center ml-auto">
                            {showAgentAbilities &&
                                abilities?.map(
                                    ({ slot, displayName, description, displayIcon }) => (
                                        <div
                                            key={slot}
                                            // onClick={() => handleShowAgentAbilityDescription(slot)}
                                            className="text-center hover:animate-pulse hover:bg-slate-50/20 p-3 rounded-lg"
                                        >
                                            <div className="flex justify-center items-center gap-5">
                                                <div>
                                                    <p className="w-96">{description}</p>
                                                </div>
                                                <div>
                                                    {displayIcon && (
                                                        <Image
                                                            src={displayIcon}
                                                            alt={`${displayName}'s Icon`}
                                                            width={100}
                                                            height={100}
                                                            priority
                                                            className="w-10 h-10 mx-auto"
                                                        />
                                                    )}
                                                    <p>{slot}</p>
                                                    <p>{displayName}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex justify-center items-center flex-col gap-8 pb-5">
                {/* DISPLAY THE AGENT'S IMAGE */}
                {selectedAgent?.map(({ uuid, displayName, fullPortrait }) => (
                    <div key={uuid}>
                        {fullPortrait && (
                            <Image
                                src={fullPortrait}
                                alt={`${displayName}'s Image`}
                                width={600}
                                height={600}
                                quality={100}
                                sizes="45vw"
                                priority
                                className={`${
                                    showAgentAbilities
                                        ? "-translate-y-[330px] -translate-x-[80%]"
                                        : "left-1/2"
                                } fixed top-1/2 transform -translate-y-72 -translate-x-1/2 w-auto h-auto z-[-10] ease-in-out duration-300`}
                            />
                        )}
                        {/* BUTTON FOR SELECTING AN AGENT */}
                        <button
                            onClick={handleShowAgentAbilities}
                            className="bg-red-500 py-3 px-6 font-medium text-lg hover:animate-pulse hover:rounded-tl-xl hover:rounded-br-xl ease-in-out duration-300"
                        >
                            {showAgentAbilities ? "Hide ability" : "Select agent"}
                        </button>
                    </div>
                ))}

                {/* DISPLAYS ALL THE AGENTS */}
                <div className="flex justify-center flex-wrap gap-3 ">
                    {loading &&
                        Array.from({ length: 22 }).map((_, index) => (
                            <div key={index} className="flex border-2 border-white animate-pulse">
                                <div className="w-16 h-16 bg-slate-50/20"></div>
                            </div>
                        ))}
                    {agents
                        .filter((agent) => agent.isPlayableCharacter)
                        .map(({ uuid, displayName, displayIconSmall }) => (
                            <button
                                key={uuid}
                                onClick={() => handleChooseAgent(uuid as string)}
                                className="flex border-2 border-white"
                            >
                                <Image
                                    src={displayIconSmall ?? ""}
                                    alt={`${displayName}'s Image`}
                                    width={100}
                                    height={100}
                                    priority
                                    className="w-16 h-16 hover:bg-slate-700/90"
                                />
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
}
