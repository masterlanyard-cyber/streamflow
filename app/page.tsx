'use client'

import { useEffect, useState } from 'react'

import {
  Radio,
  Activity,
  Music,
  BarChart3,
  Settings,
  Play,
  Square,
  RefreshCcw
} from 'lucide-react'

import { motion } from 'framer-motion'

/* CONTROL BUTTON */
function ControlButton({
  icon,
  label,
  color
}: any) {


  return (

    <button
      className={`
        ${color}
        rounded-2xl
        p-5
        text-black
        font-bold
        text-lg
        flex
        items-center
        justify-center
        gap-3
        hover:scale-105
        transition
      `}
    >

      {icon}

      {label}

    </button>

  )

}

/* STATION CARD */
function StationCard({
  title,
  subtitle,
  station
}: any) {

  async function switchStation() {

    try {

      const res = await fetch(
        `http://164.68.98.73:3000/api/switch-station?station=${station}`
      )

      const data = await res.json()

      if(data.success){

        alert(`${title} Activated 🚀`)

      }

    } catch(err){

      alert('Switch Failed')

    }

  }

  return (

    <motion.div

      whileHover={{ scale: 1.03 }}

      onClick={switchStation}

      className="
      bg-[#111827]
      border
      border-slate-800
      rounded-3xl
      p-6
      cursor-pointer
      "

    >

      <div
        className="
        h-40
        rounded-2xl
        bg-gradient-to-br
        from-cyan-500
        to-blue-700
        mb-6
      "
      />

      <h4 className="text-2xl font-bold mb-2">
        {title}
      </h4>

      <p className="text-slate-400">
        {subtitle}
      </p>

    </motion.div>

  )
}

/* SIDEBAR */
function SidebarItem({
  icon,
  label,
  active = false,
  onClick
}: any) {

  return (

    <div

      onClick={onClick}

      className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition ${
        active
          ? 'bg-cyan-500 text-black font-bold'
          : 'hover:bg-[#111827] text-slate-300'
      }`}
    >

      {icon}

      {label}

    </div>

  )

}

export default function Home() {

  const [system, setSystem] = useState({
    cpu: 0,
    ram: 0,
    status: 'offline'
  })

  const [currentSong, setCurrentSong] =
    useState('Loading...')

  const [tracks, setTracks] =
  useState<string[]>([])

  const [activeTab, setActiveTab] =
  useState('dashboard')

  /* SYSTEM STATUS */
  useEffect(() => {

    fetch(
      'http://164.68.98.73:3000/api/status'
    )
      .then(res => res.json())
      .then(data => {

        setSystem({
          cpu: data.cpu || 0,
          ram: data.ram || 0,
          status: data.status || 'offline'
        })

      })

  }, [])

  /* NOW PLAYING */
  
useEffect(() => {

  async function fetchTracks(){

    try {

      const res =
        await fetch(
          'http://164.68.98.73:3000/api/tracks'
        )

      const data =
        await res.json()

      if(data.tracks){

        setTracks(
          data.tracks
        )

      }

    } catch(err){

      console.log(err)

    }

  }

  fetchTracks()

}, [])

useEffect(() => {

    async function fetchSong(){

      try {

        const res =
          await fetch(
            'http://164.68.98.73:3000/api/now-playing'
          )

        const data =
          await res.json()

        if(data.song){

          setCurrentSong(
            data.song
          )

        }

      } catch(err){

        console.log(err)

      }

    }

    fetchSong()

    const interval =
      setInterval(
        fetchSong,
        5000
      )

    return () =>
      clearInterval(interval)

  }, [])

useEffect(() => {

  async function fetchTracks(){

    try {

      const res =
        await fetch(
          'http://164.68.98.73:3000/api/tracks'
        )

      const data =
        await res.json()

      if(data.tracks){

        setTracks(
          data.tracks
        )

      }

    } catch(err){

      console.log(err)

    }

  }

  fetchTracks()

}, [])

  return (

    <main className="min-h-screen bg-[#020817] text-white flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#081028] border-r border-slate-800 p-6 hidden md:flex flex-col">

        <div className="mb-12">

          <h1 className="text-4xl font-black tracking-tight">
            STREAMFLOW
          </h1>

          <p className="text-slate-500 mt-2">
            AI RADIO PLATFORM
          </p>

        </div>

        <nav className="space-y-3">

<SidebarItem
  icon={<Radio size={20} />}
  label="Dashboard"
  active={activeTab === 'dashboard'}
  onClick={() =>
    setActiveTab('dashboard')
  }
/>

<SidebarItem
  icon={<Music size={20} />}
  label="Stations"
  active={activeTab === 'stations'}
  onClick={() =>
    setActiveTab('stations')
  }
/>

<SidebarItem
  icon={<Activity size={20} />}
  label="Analytics"
  active={activeTab === 'analytics'}
  onClick={() =>
    setActiveTab('analytics')
  }
/>

<SidebarItem
  icon={<BarChart3 size={20} />}
  label="Automation"
  active={activeTab === 'automation'}
  onClick={() =>
    setActiveTab('automation')
  }
/>

<SidebarItem
  icon={<Settings size={20} />}
  label="Settings"
  active={activeTab === 'settings'}
  onClick={() =>
    setActiveTab('settings')
  }
/>

        </nav>

      </aside>

      {/* MAIN */}
      <section className="flex-1 p-8">

        {/* TOP */}
        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-5xl font-bold">
              Dashboard
            </h2>

            <p className="text-slate-400 mt-2">
              Welcome to StreamFlow Control Center
            </p>

          </div>

          <div className="bg-red-500 px-6 py-3 rounded-full font-bold">
            {system.status.toUpperCase()}
          </div>

        </div>

{activeTab === 'dashboard' && (
<>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

          {/* NOW PLAYING */}
          <motion.div

            whileHover={{ scale: 1.02 }}

            className="
            xl:col-span-2
            bg-[#111827]
            rounded-3xl
            p-8
            border
            border-slate-800
          "

          >

            <p className="text-slate-400 mb-4">
              NOW PLAYING
            </p>

            <h3 className="text-5xl font-bold mb-4 text-cyan-400">
              {currentSong}
            </h3>

            <p className="text-slate-500 mb-8">
              Ambient • Chill • Coding • Meditation
            </p>

            <div className="flex items-end gap-2 h-24">

              {[40,80,30,100,60,90,50,120,70,95].map((h, i) => (

                <div
                  key={i}
                  className="
                  bg-cyan-400
                  rounded-full
                  w-3
                  animate-pulse
                "
                  style={{
                    height: `${h}px`
                  }}
                />

              ))}

            </div>

          </motion.div>

          {/* SYSTEM */}
          <motion.div

            whileHover={{ scale: 1.02 }}

            className="
            bg-[#111827]
            rounded-3xl
            p-8
            border
            border-slate-800
          "

          >

            <p className="text-slate-400 mb-6">
              SYSTEM
            </p>

            <div className="space-y-6">

              <div>

                <p className="text-slate-500 mb-2">
                  CPU
                </p>

                <h3 className="text-5xl font-bold text-green-400">
                  {system.cpu}%
                </h3>

              </div>

              <div>

                <p className="text-slate-500 mb-2">
                  RAM
                </p>

                <h3 className="text-5xl font-bold text-green-400">
                  {system.ram}%
                </h3>

              </div>

            </div>

          </motion.div>

        </div>


</>
)}

{activeTab === 'stations' && (

  <div className="p-8">

    <h2 className="text-5xl font-bold mb-4">
      Stations
    </h2>

    <p className="text-slate-400 mb-8">
      Manage playlists, uploads, and radio stations.
    </p>

    {/* STATIONS */}
    <div className="mb-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StationCard
          title="Sleep Radio"
          subtitle="Meditation • Deep Sleep"
          station="lullaby"
        />

        <StationCard
          title="Workout Radio"
          subtitle="Gym • Cardio • Energy"
          station="workout"
        />

        <StationCard
          title="LoFi Radio"
          subtitle="Study • Chill • Coding"
          station="lofi"
        />

      </div>

    </div>

    {/* UPLOAD MUSIC */}
    <div className="bg-[#111827] rounded-3xl p-8 border border-slate-800 mb-6">

      <h3 className="text-3xl font-bold mb-6">
        Upload Music
      </h3>

      <input

        type="file"

        accept=".mp3"

        onChange={async (e:any) => {

          const file =
            e.target.files[0]

          if(!file) return

          const formData =
            new FormData()

          formData.append(
            'audio',
            file
          )

          try {

            const res =
              await fetch(

                'http://164.68.98.73:3000/api/upload-audio',

                {
                  method:'POST',
                  body:formData
                }

              )

            const data =
              await res.json()

            if(data.success){

              alert(
                'Upload Success 🚀'
              )

            }

          } catch(err){

            alert(
              'Upload Failed'
            )

          }

        }}

        className="
        bg-slate-900
        p-4
        rounded-2xl
        w-full
        "

      />

    </div>

    {/* TRACK LIBRARY */}
    <div className="bg-[#111827] rounded-3xl p-8 border border-slate-800 mb-6">

      <h3 className="text-3xl font-bold mb-6">
        Track Library
      </h3>

      <div className="space-y-3 max-h-[400px] overflow-auto">

        {tracks.map((track, index) => (

          <div

            key={index}

            className="
            bg-slate-900
            rounded-2xl
            p-4
            flex
            justify-between
            items-center
            "

          >

            <p className="font-semibold">
              {track}
            </p>

          </div>

        ))}

      </div>

    </div>

    {/* CONTROLS */}
    <div className="bg-[#111827] rounded-3xl p-8 border border-slate-800">

      <h3 className="text-3xl font-bold mb-6">
        Controls
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <ControlButton
          icon={<Play />}
          label="START STREAM"
          color="bg-green-500"
        />

        <ControlButton
          icon={<Square />}
          label="STOP STREAM"
          color="bg-red-500"
        />

        <ControlButton
          icon={<RefreshCcw />}
          label="RESTART"
          color="bg-yellow-500"
        />

      </div>

    </div>

  </div>

)}
      </section>

    </main>

  )

}
