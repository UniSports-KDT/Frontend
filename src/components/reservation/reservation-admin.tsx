import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ReservationAdmin() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">john@example.com</div>
                </div>
                <Badge variant="outline" className="text-xs">
                  대기 중
                </Badge>
              </div>
              <div className="mt-4">
                <div>농구 코트</div>
                <div className="text-sm text-muted-foreground">2023-06-01, 10:00 AM - 12:00 PM</div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  승인
                </Button>
                <Button variant="outline" size="sm" className="text-red-500">
                  거절
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-sm text-muted-foreground">jane@example.com</div>
                </div>
                <Badge variant="outline" className="text-xs">
                  대기 중
                </Badge>
              </div>
              <div className="mt-4">
                <div>수영장</div>
                <div className="text-sm text-muted-foreground">2023-06-05, 3:00 PM - 5:00 PM</div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  승인
                </Button>
                <Button variant="outline" size="sm" className="text-red-500">
                  거절
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Michael Johnson</div>
                  <div className="text-sm text-muted-foreground">michael@example.com</div>
                </div>
                <Badge variant="outline" className="text-xs">
                  대기 중
                </Badge>
              </div>
              <div className="mt-4">
                <div>테니스 코트</div>
                <div className="text-sm text-muted-foreground">2023-06-10, 2:00 PM - 4:00 PM</div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  승인
                </Button>
                <Button variant="outline" size="sm" className="text-red-500">
                  거절
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
