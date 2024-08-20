'use client'

import Link from "next/link"
import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {FacilityListProps} from "@/types/facility";

export function FacilityList({ facilities }: FacilityListProps) {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">시설 검색</h1>
              <p className="text-muted-foreground">원하는 시설을 찾아 예약하세요.</p>
            </div>
            <div className="bg-background rounded-lg border p-6 mb-8">
              <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search">검색</Label>
                  <Input id="search" placeholder="시설 이름 검색" />
                </div>
                <div>
                  <Label htmlFor="location">위치</Label>
                  <Select>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="위치 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="campus-a">캠퍼스 A</SelectItem>
                      <SelectItem value="campus-b">캠퍼스 B</SelectItem>
                      <SelectItem value="campus-c">캠퍼스 C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sport">종목</Label>
                  <Select>
                    <SelectTrigger id="sport">
                      <SelectValue placeholder="종목 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basketball">농구</SelectItem>
                      <SelectItem value="volleyball">배구</SelectItem>
                      <SelectItem value="soccer">축구</SelectItem>
                      <SelectItem value="tennis">테니스</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </div>
            {facilities && facilities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {facilities.map((facility) => (
                      <Card key={facility.id}>
                        <Link href={`/facility-reservations/${facility.id}`} passHref>
                          <div className="cursor-pointer">
                            <Image
                                src={facility.imageUrls?.[0] || "/placeholder.svg"}
                                alt={facility.name}
                                width={400}
                                height={225}
                                className="rounded-t-lg object-cover"
                                style={{ aspectRatio: "400/225", objectFit: "cover" }}
                            />
                            <CardContent>
                              <h3 className="text-lg font-bold mb-2">{facility.name}</h3>
                              <p className="text-muted-foreground mb-4">{facility.description}</p>
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary">
                                  {facility.fee === 0 ? '무료' : `1hour: ${facility.fee}￦`}
                                </Badge>
                                <Button variant="outline" size="sm">
                                  자세히 보기
                                </Button>
                              </div>
                            </CardContent>
                          </div>
                        </Link>
                      </Card>
                  ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-[50vh]">
                  <p className="text-lg text-muted-foreground">현재 사용 가능한 시설이 없습니다.</p>
                  {/*/!*서버 완성되면 아래 코드 지움*!/*/}
                  {/*<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">*/}
                  {/*  <Card>*/}
                  {/*    <Link href="/facility-resevations" prefetch={false}>*/}
                  {/*      <img*/}
                  {/*          src="/placeholder.svg"*/}
                  {/*          width={400}*/}
                  {/*          height={225}*/}
                  {/*          alt="농구장"*/}
                  {/*          className="rounded-t-lg object-cover"*/}
                  {/*          style={{aspectRatio: "400/225", objectFit: "cover"}}*/}
                  {/*      />*/}
                  {/*      <CardContent>*/}
                  {/*        <h3 className="text-lg font-bold mb-2">농구장</h3>*/}
                  {/*        <p className="text-muted-foreground mb-4">규격 농구장, 높이 조절 가능한 골대.</p>*/}
                  {/*        <div className="flex items-center justify-between">*/}
                  {/*          <Badge variant="default">*/}
                  {/*            사용 가능*/}
                  {/*          </Badge>*/}
                  {/*          <Button variant="outline" size="sm">*/}
                  {/*            자세히 보기*/}
                  {/*          </Button>*/}
                  {/*        </div>*/}
                  {/*      </CardContent>*/}
                  {/*    </Link>*/}
                  {/*  </Card>*/}
                  {/*  <Card>*/}
                  {/*    <Link href="#" prefetch={false}>*/}
                  {/*      <img*/}
                  {/*          src="/placeholder.svg"*/}
                  {/*          width={400}*/}
                  {/*          height={225}*/}
                  {/*          alt="배구장"*/}
                  {/*          className="rounded-t-lg object-cover"*/}
                  {/*          style={{aspectRatio: "400/225", objectFit: "cover"}}*/}
                  {/*      />*/}
                  {/*      <CardContent>*/}
                  {/*        <h3 className="text-lg font-bold mb-2">배구장</h3>*/}
                  {/*        <p className="text-muted-foreground mb-4">규격 배구장, 높이 조절 가능한 네트.</p>*/}
                  {/*        <div className="flex items-center justify-between">*/}
                  {/*          <Badge variant="default">*/}
                  {/*            사용 가능*/}
                  {/*          </Badge>*/}
                  {/*          <Button variant="outline" size="sm">*/}
                  {/*            자세히 보기*/}
                  {/*          </Button>*/}
                  {/*        </div>*/}
                  {/*      </CardContent>*/}
                  {/*    </Link>*/}
                  {/*  </Card>*/}
                  {/*  <Card>*/}
                  {/*    <Link href="#" prefetch={false}>*/}
                  {/*      <img*/}
                  {/*          src="/placeholder.svg"*/}
                  {/*          width={400}*/}
                  {/*          height={225}*/}
                  {/*          alt="축구장"*/}
                  {/*          className="rounded-t-lg object-cover"*/}
                  {/*          style={{aspectRatio: "400/225", objectFit: "cover"}}*/}
                  {/*      />*/}
                  {/*      <CardContent>*/}
                  {/*        <h3 className="text-lg font-bold mb-2">축구장</h3>*/}
                  {/*        <p className="text-muted-foreground mb-4">규격 축구장, 인조 잔디 표면.</p>*/}
                  {/*        <div className="flex items-center justify-between">*/}
                  {/*          <Badge variant="default">*/}
                  {/*            사용 가능*/}
                  {/*          </Badge>*/}
                  {/*          <Button variant="outline" size="sm">*/}
                  {/*            자세히 보기*/}
                  {/*          </Button>*/}
                  {/*        </div>*/}
                  {/*      </CardContent>*/}
                  {/*    </Link>*/}
                  {/*  </Card>*/}
                  {/*  <Card>*/}
                  {/*    <Link href="#" prefetch={false}>*/}
                  {/*      <img*/}
                  {/*          src="/placeholder.svg"*/}
                  {/*          width={400}*/}
                  {/*          height={225}*/}
                  {/*          alt="테니스장"*/}
                  {/*          className="rounded-t-lg object-cover"*/}
                  {/*          style={{aspectRatio: "400/225", objectFit: "cover"}}*/}
                  {/*      />*/}
                  {/*      <CardContent>*/}
                  {/*        <h3 className="text-lg font-bold mb-2">테니스장</h3>*/}
                  {/*        <p className="text-muted-foreground mb-4">규격 테니스장, 하드 코트 표면.</p>*/}
                  {/*        <div className="flex items-center justify-between">*/}
                  {/*          <Badge variant="default">*/}
                  {/*            사용 가능*/}
                  {/*          </Badge>*/}
                  {/*          <Button variant="outline" size="sm">*/}
                  {/*            자세히 보기*/}
                  {/*          </Button>*/}
                  {/*        </div>*/}
                  {/*      </CardContent>*/}
                  {/*    </Link>*/}
                  {/*  </Card>*/}
                  {/*</div>*/}
                </div>
            )}
          </div>
        </main>
      </div>
  )
}