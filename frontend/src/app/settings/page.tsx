"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { Bell, Moon, Sun, Clock, Brain, Target, User, Database } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    studyReminders: true,
    weeklyProgress: true,
    achievements: true,
    newContent: false
  })
  
  const [studySettings, setStudySettings] = useState({
    dailyGoal: 20,
    sessionLength: 25,
    difficulty: "adaptive",
    autoAdvance: true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your learning experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sun className="h-5 w-5" />
              <span>Appearance</span>
            </CardTitle>
            <CardDescription>Customize how LearnForge looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-3 block">Theme</label>
              <div className="flex space-x-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("system")}
                >
                  System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Study Reminders</div>
                <div className="text-sm text-muted-foreground">Daily reminders to study</div>
              </div>
              <Switch
                checked={notifications.studyReminders}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, studyReminders: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Weekly Progress</div>
                <div className="text-sm text-muted-foreground">Weekly progress summaries</div>
              </div>
              <Switch
                checked={notifications.weeklyProgress}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, weeklyProgress: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Achievements</div>
                <div className="text-sm text-muted-foreground">When you unlock new badges</div>
              </div>
              <Switch
                checked={notifications.achievements}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, achievements: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">New Content</div>
                <div className="text-sm text-muted-foreground">New roadmaps and features</div>
              </div>
              <Switch
                checked={notifications.newContent}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, newContent: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Study Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Study Settings</span>
            </CardTitle>
            <CardDescription>Configure your study sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Daily Goal (cards)</label>
              <input
                type="number"
                value={studySettings.dailyGoal}
                onChange={(e) =>
                  setStudySettings({ ...studySettings, dailyGoal: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                min="1"
                max="100"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Session Length (minutes)</label>
              <input
                type="number"
                value={studySettings.sessionLength}
                onChange={(e) =>
                  setStudySettings({ ...studySettings, sessionLength: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                min="5"
                max="120"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Difficulty Mode</label>
              <div className="flex space-x-2">
                <Button
                  variant={studySettings.difficulty === "easy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStudySettings({ ...studySettings, difficulty: "easy" })}
                >
                  Easy
                </Button>
                <Button
                  variant={studySettings.difficulty === "adaptive" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStudySettings({ ...studySettings, difficulty: "adaptive" })}
                >
                  Adaptive
                </Button>
                <Button
                  variant={studySettings.difficulty === "hard" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStudySettings({ ...studySettings, difficulty: "hard" })}
                >
                  Hard
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Auto-advance</div>
                <div className="text-sm text-muted-foreground">Automatically move to next card</div>
              </div>
              <Switch
                checked={studySettings.autoAdvance}
                onCheckedChange={(checked) =>
                  setStudySettings({ ...studySettings, autoAdvance: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Account</span>
            </CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Display Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Export Data
              </Button>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button size="lg">Save Changes</Button>
      </div>
    </div>
  )
}