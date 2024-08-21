'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {FacilityListProps} from "@/types/facility";
import { Card } from "@/components/ui/card"

export function FacilityAdmin({ facilities }: FacilityListProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">시설 관리</h1>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              새로운 시설 등록
            </Button>
          </div>
          {facilities && facilities.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {facilities.map((facility) => (
                    <Card key={facility.id} className="bg-background rounded-lg shadow overflow-hidden">
                      <Link href="#" className="block" prefetch={false}>
                        <div className="p-4">
                          <h3 className="text-lg font-medium">{facility.name}</h3>
                          <p className="text-muted-foreground">{facility.location}</p>
                          <p className="text-muted-foreground">운영 시간: {facility.operatingHours}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2 bg-muted p-4">
                          <Button variant="outline" size="icon">
                            <FilePenIcon className="h-4 w-4" />
                            <span className="sr-only">수정</span>
                          </Button>
                          <Button variant="outline" size="icon" className="text-red-500">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">삭제</span>
                          </Button>
                        </div>
                      </Link>
                    </Card>
                ))}
              </div>
          ) : (
              <div className="flex justify-center items-center h-[50vh]">
                <p className="text-lg text-muted-foreground">등록된 시설이 없습니다.</p>
              </div>
          )}
        </div>
      </main>
    </div>
  )
}

function FilePenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}