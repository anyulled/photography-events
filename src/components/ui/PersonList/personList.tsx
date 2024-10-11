"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, Search, Users } from "lucide-react";
import { Person, UserType } from "@/services/personService";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import Link from "next/link";
import Image from "next/image";

export function PersonList(props: {
  persons: Person[];
  itemsPerPage?: number;
  personType?: UserType;
}) {
  //region State
  const { persons, itemsPerPage = 9, personType = "model" } = props;
  const [filteredPersons, setFilteredPersons] = useState<Person[]>(
    props.persons,
  );
  const cities = Array.from(
    new Set(props.persons.map((value) => value.city)),
  ).sort((a, b) => a.localeCompare(b));
  const countries = Array.from(
    new Set(props.persons.map((value) => value.country)),
  ).sort((a, b) => a.localeCompare(b));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const indexOfLastPerson = currentPage * itemsPerPage;
  const indexOfFirstPersons = indexOfLastPerson - itemsPerPage;
  const currentPersons = filteredPersons.slice(
    indexOfFirstPersons,
    indexOfLastPerson,
  );
  //endregion

  useEffect(() => {
    const filtered = persons.filter((person) => {
      const matchesSearch = person.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGender =
        selectedGender === "all" || person.gender === selectedGender;
      const matchesCity =
        selectedCity === "all" || person.city === selectedCity;
      const matchesCountry =
        selectedCountry === "all" || person.country === selectedCountry;
      return matchesSearch && matchesGender && matchesCity && matchesCountry;
    });
    setFilteredPersons(filtered);
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedGender,
    selectedCity,
    selectedCountry,
    props.persons,
    persons,
  ]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Input
              className="w-full"
              placeholder={`Search ${personType}...`}
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedGender} onValueChange={setSelectedGender}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {cities.map((value, index) => (
                <SelectItem key={index} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {countries.map((value, index) => (
                <SelectItem key={index} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="w-full md:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
        <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentPersons.map((person) => (
            <Card key={person.id} className="overflow-hidden">
              <Link href={`/${personType}s/${person.username}`}>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <Image
                      alt={person.name}
                      className="object-cover w-full h-full"
                      height="400"
                      src={person.image}
                      style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                      width="400"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-6">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl font-semibold">
                        {person.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-2">
                      <p className="text-sm text-gray-500">
                        <MapPin className="inline-block w-4 h-4 mr-1" />
                        {person.city}, {getUnicodeFlagIcon(person.countryCode)}{" "}
                        {person.country}
                      </p>
                      {person.travelNotices > 0 && (
                        <p className="text-sm text-gray-500">
                          <Globe className="inline-block w-4 h-4 mr-1" />
                          {person.travelNotices} travel notices
                        </p>
                      )}
                      {person.events > 0 && (
                        <p className="text-sm text-gray-500">
                          <Users className="inline-block w-4 h-4 mr-1" />
                          {person.events} events
                        </p>
                      )}
                    </CardContent>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
