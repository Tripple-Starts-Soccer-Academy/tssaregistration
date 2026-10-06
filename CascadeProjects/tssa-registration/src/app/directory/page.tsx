'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  ageGroup: string;
  team: string;
  registrationStatus: 'complete' | 'incomplete';
}

const mockPlayers: Player[] = [
  { id: 1, firstName: 'John', lastName: 'Smith', photo: '', ageGroup: 'Under 10', team: 'Team A', registrationStatus: 'complete' },
  { id: 2, firstName: 'Sarah', lastName: 'Johnson', photo: '', ageGroup: 'Under 12-14', team: 'Team B', registrationStatus: 'complete' },
  { id: 3, firstName: 'Michael', lastName: 'Williams', photo: '', ageGroup: 'Under 15-16', team: 'Team A', registrationStatus: 'incomplete' },
  { id: 4, firstName: 'Emily', lastName: 'Brown', photo: '', ageGroup: 'Under 10', team: 'Team C', registrationStatus: 'complete' },
  { id: 5, firstName: 'David', lastName: 'Davis', photo: '', ageGroup: 'Under 17', team: 'Team B', registrationStatus: 'incomplete' },
  { id: 6, firstName: 'James', lastName: 'Wilson', photo: '', ageGroup: 'Under 12-14', team: 'Team A', registrationStatus: 'complete' },
  { id: 7, firstName: 'Emma', lastName: 'Taylor', photo: '', ageGroup: 'Under 15-16', team: 'Team C', registrationStatus: 'complete' },
  { id: 8, firstName: 'Lucas', lastName: 'Anderson', photo: '', ageGroup: 'Under 18', team: 'Team B', registrationStatus: 'incomplete' },
  { id: 9, firstName: 'Sophia', lastName: 'Thomas', photo: '', ageGroup: 'Under 10', team: 'Team A', registrationStatus: 'complete' },
  { id: 10, firstName: 'Oliver', lastName: 'Jackson', photo: '', ageGroup: 'Under 17', team: 'Team C', registrationStatus: 'complete' },
];

const ageGroups = ['Under 10', 'Under 12-14', 'Under 15-16', 'Under 17', 'Under 18'];

export default function Directory() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'registered' | 'incomplete'>('all');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(ageGroups));

  const filteredPlayers = mockPlayers.filter(player => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'registered') return player.registrationStatus === 'complete';
    if (statusFilter === 'incomplete') return player.registrationStatus === 'incomplete';
    return true;
  });

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(group)) {
      newExpanded.delete(group);
    } else {
      newExpanded.add(group);
    }
    setExpandedGroups(newExpanded);
  };

  const expandAll = () => setExpandedGroups(new Set(ageGroups));
  const collapseAll = () => setExpandedGroups(new Set());

  const getPlayersByAgeGroup = (ageGroup: string) => {
    return filteredPlayers.filter(player => player.ageGroup === ageGroup);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-50">
      <Navigation />
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-t-2xl">
            <h1 className="text-4xl font-bold mb-2">Academy Directory</h1>
            <p className="text-lg opacity-90">View and manage registered players by age group</p>
          </div>

        <div className="bg-white rounded-b-2xl shadow-2xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-gray-600 font-semibold mb-2">Registration Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="all">All Players</option>
                  <option value="registered">Registered</option>
                  <option value="incomplete">Registration Incomplete</option>
                </select>
              </div>
              <div className="flex gap-2 items-end">
                <button
                  onClick={expandAll}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all font-semibold"
                >
                  Collapse All
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Total Players: <span className="font-bold text-blue-600">{filteredPlayers.length}</span></p>
            </div>
          </div>

          {statusFilter === 'incomplete' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="text-red-700 font-bold mb-2">Registration Incomplete</h3>
              <p className="text-red-600">Players who have not completed registration will be listed here. Please contact them to complete their registration.</p>
            </div>
          )}

          <div className="space-y-4">
            {ageGroups.map((ageGroup) => {
              const groupPlayers = getPlayersByAgeGroup(ageGroup);
              const isExpanded = expandedGroups.has(ageGroup);
              
              if (groupPlayers.length === 0) return null;

              return (
                <div key={ageGroup} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleGroup(ageGroup)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center justify-between hover:from-blue-600 hover:to-blue-700 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <h2 className="text-xl font-bold">{ageGroup}</h2>
                      <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {groupPlayers.length} players
                      </span>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groupPlayers.map((player) => (
                          <div
                            key={player.id}
                            className={`border-2 rounded-lg p-4 transition-all hover:shadow-lg bg-white ${
                              player.registrationStatus === 'complete'
                                ? 'border-green-300'
                                : 'border-red-300'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                {player.photo ? (
                                  <img
                                    src={player.photo}
                                    alt={`${player.firstName} ${player.lastName}`}
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                ) : (
                                  <>{player.firstName[0]}{player.lastName[0]}</>
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-800">
                                  {player.firstName} {player.lastName}
                                </h3>
                                <p className="text-gray-600 text-sm">{player.team}</p>
                                <span
                                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                                    player.registrationStatus === 'complete'
                                      ? 'bg-green-500 text-white'
                                      : 'bg-red-500 text-white'
                                  }`}
                                >
                                  {player.registrationStatus === 'complete' ? 'Registered' : 'Incomplete'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No players found matching the selected criteria.</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
