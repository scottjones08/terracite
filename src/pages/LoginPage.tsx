import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sprout, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D5016 0%, #3d6b1e 40%, #7A8B69 70%, #C4724E 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Sprout className="w-7 h-7" />
              </div>
              <h1 className="text-4xl font-serif">TerraCite</h1>
            </div>
            <p className="text-xl text-white/90 font-light leading-relaxed max-w-md mb-12">
              Project management built for landscape architects who design extraordinary outdoor spaces.
            </p>
            <div className="space-y-6">
              {['Manage projects from discovery to closeout', 'Track sustainability goals & SITES credits', 'Streamline design review & client approvals'].map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  <span className="text-white/80">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-cream p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-forest flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-serif text-forest">TerraCite</h1>
          </div>

          <h2 className="text-2xl font-serif text-foreground mb-1">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to your workspace</p>

          <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard') }} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="andrew@citedesign.com" defaultValue="andrew@citedesign.com" className="h-11 bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} defaultValue="password123" className="h-11 bg-white pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" defaultChecked />
                <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-forest hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full h-11 bg-forest hover:bg-forest-light text-white font-medium">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don&apos;t have an account? <a href="#" className="text-forest hover:underline font-medium">Contact your admin</a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
