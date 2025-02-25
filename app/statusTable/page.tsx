"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompanyData {
  companyName: string;
  status: string;
  dateOnboarded: string;
  dateStarted: string;
}

const initialCompanyData: CompanyData[] = [
  {
    companyName: "ABC Corp",
    status: "Active",
    dateOnboarded: "2024-01-15",
    dateStarted: "2024-01-20",
  },
  {
    companyName: "XYZ Ltd",
    status: "Onboarded",
    dateOnboarded: "2024-02-01",
    dateStarted: "2024-02-05",
  },
];

const statusOptions = ["onboarded", "active", "systemUser", "fullyCompliant"];

interface StatusTableProps {
  userRole: "McashDivision" | "SpbdDivision" | "RegionalManager";
}

export const StatusTable = ({ userRole }: StatusTableProps) => {
  const [companyData, setCompanyData] = useState<CompanyData[]>(() => {
    const storedData = localStorage.getItem("statusTableData");
    return storedData ? JSON.parse(storedData) : initialCompanyData;
  });
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customStatus, setCustomStatus] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<number | null>(null);

  const filteredCompanyData = companyData.filter(company => {
    const isStatusMatch = statusFilter === "all" ||
      (statusFilter === "other" && !statusOptions.includes(company.status.toLowerCase())) ||
      company.status.toLowerCase() === statusFilter.toLowerCase();
    return company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) && isStatusMatch;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = localStorage.getItem("statusTableData");
      if (storedData) {
        setCompanyData(JSON.parse(storedData));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedData = [...companyData];
    updatedData[index] = {
      ...updatedData[index],
      status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
    };
    setCompanyData(updatedData);

    toast({
      title: "Status Updated",
      description: `${companyData[index].companyName}'s status has been updated to ${newStatus}`,
      style: {
        backgroundColor: "green",
        color: "white",
        border: "red",
      },
    });
  };

  const handleCustomStatusSubmit = () => {
    if (selectedIndex !== null && customStatus.trim()) {
      handleStatusChange(selectedIndex, customStatus);
      setCustomStatus("");
      setIsDialogOpen(false);
    }
  };

  const handleDeleteCompany = (index: number) => {
    setCompanyToDelete(index);
    setIsConfirmDialogOpen(true);
  };

  const confirmDeleteCompany = () => {
    if (companyToDelete !== null) {
      const updatedData = companyData.filter((_, i) => i !== companyToDelete);
      setCompanyData(updatedData);
      localStorage.setItem("statusTableData", JSON.stringify(updatedData));
      toast({
        title: "Company Deleted",
        description: "The company has been successfully deleted.",
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
    setIsConfirmDialogOpen(false);
    setCompanyToDelete(null);
  };

  return (
    <ScrollArea className="h-[60vh] pr-4">
      <div className="flex items-center gap-4 mb-4">
        <Input
          placeholder="Search Company Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-8 w-40 sm:w-52 md:w-64 lg:w-80"
        />
        <div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Onboarded</TableHead>
            <TableHead>Date Started</TableHead>
            <TableHead>Actions</TableHead>
            {userRole === "McashDivision" && <TableHead />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanyData.map((company, index) => (
            <TableRow key={index}>
              <TableCell>{company.companyName}</TableCell>
              <TableCell>
                {userRole === "McashDivision" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-[130px] justify-between font-normal ${
                          company.status.toLowerCase() === "onboarded"
                            ? "text-yellow-600"
                            : company.status.toLowerCase() === "active"
                            ? "text-green-600"
                            : company.status.toLowerCase() === "systemuser"
                            ? "text-blue-600"
                            : company.status.toLowerCase() === "fullycompliant"
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        {company.status}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {statusOptions.map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => handleStatusChange(index, status)}
                          className={`${
                            status === "onboarded"
                              ? "text-yellow-600"
                              : status === "active"
                              ? "text-green-600"
                              : status === "systemUser"
                              ? "text-blue-600"
                              : status === "fullyCompliant"
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedIndex(index);
                          setIsDialogOpen(true);
                        }}
                      >
                        Other...
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div
                    className={`w-[130px] font-normal ${
                      company.status.toLowerCase() === "onboarded"
                        ? "text-yellow-600"
                        : company.status.toLowerCase() === "active"
                        ? "text-blue-600"
                        : company.status.toLowerCase() === "systemuser"
                        ? "text-green-600"
                        : company.status.toLowerCase() === "fullycompliant"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {company.status}
                  </div>
                )}
              </TableCell>
              <TableCell>{company.dateOnboarded}</TableCell>
              <TableCell>{company.dateStarted}</TableCell>
              {userRole === "McashDivision" && (
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCompany(index)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for custom status input */}
      {userRole === "McashDivision" && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Custom Status</DialogTitle>
              <DialogDescription>
                Type a custom status for the selected company.
              </DialogDescription>
            </DialogHeader>
            <Input
              value={customStatus}
              onChange={(e) => setCustomStatus(e.target.value)}
              placeholder="Enter custom status..."
            />
            <Button onClick={handleCustomStatusSubmit}>Submit</Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog for confirmation of company deletion */}
      {userRole === "McashDivision" && (
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>Are you sure you want to delete this company?</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button onClick={confirmDeleteCompany} className="bg-red-500 text-white">Confirm</Button>
              <Button onClick={() => setIsConfirmDialogOpen(false)}>Cancel</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ScrollArea>
  );
};

export default StatusTable;