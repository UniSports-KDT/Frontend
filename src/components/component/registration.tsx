import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export function Registration() {
  return (
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1 bg-background">
          <section className="container mx-auto py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold">회원가입</h1>
                <p className="text-muted-foreground text-sm sm:text-base">학교 시설을 편하게 이용해보세요! 계정을 만드세요.</p>
              </div>
              <form className="mt-6 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">이름</Label>
                  <Input id="username" placeholder="본인의 이름을 입력해주세요."/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="studentId">학번</Label>
                  <Input id="studentId" placeholder="본인의 학번을 입력해주세요."/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">아이디</Label>
                  <Input id="username" placeholder="username에 해당함"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input id="password" type="password" placeholder="비밀번호를 입력하세요"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <Input id="confirmPassword" type="password" placeholder="비밀번호를 다시 한번 입력하세요"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">학과</Label>
                  <Input id="department" placeholder="본인의 속한 학과를 입력해주세요."/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input id="phone" type="tel" placeholder="전화번호를 입력하세요"/>
                </div>
                <div className="grid gap-2">
                  {/*사용자 역할?? 뭔가 다른 이름으로 명명할 수 없을까??*/}
                  <Label htmlFor="role">사용자 역할</Label>
                  <Select id="role">
                    <SelectTrigger>
                      <SelectValue placeholder="역할을 선택하세요"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">관리자</SelectItem>
                      <SelectItem value="student">학생</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  등록
                </Button>
              </form>
            </div>
          </section>
        </main>
      </div>
  )
}
